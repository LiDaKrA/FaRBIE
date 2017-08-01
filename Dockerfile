# Dockerfile for FaRBIE-reactive
# 1) Build an image using this docker file. Run the following docker command
#
#    $ docker build -t lidakra/farbie:v1.1.0 .
#
# 2) Test FaRBIE in a container. Run the following docker command for testing
#
#    $ docker run --rm -it -p 9000:9000 --network=farbie-net --name farbie lidakra/farbie:v1.1.0 /bin/bash
#
# 3) FaRBIE needs API keys to access RDF graphs. The keys are stored in conf/application.conf
# For security reason the application.conf file on Github does not contain the keys. The config file
# must be provided in a Docker data volume loaded with the config file. As an example copy the config file in 
# a folder in the server host (e.g. /home/lidakra/farbie-conf) then run a container using an image
# already available or a small one like alpine (a small Linux version) mapping the folder with the config file
# in the host to the folder conf/ in the container.
# 
#    $ docker run -d -v /home/lidakra/farbie-conf/application.conf:/home/lidakra/farbie-1.1.0/conf/application.conf:ro \
#                                         --name farbie-conf alpine echo "FaRBIE Config File"
#
# 4) Start a container with FaRBIE using the config file in the data volume
#
#    $ docker run -it -p 9000:9000 --volumes-from farbie-conf --name farbie lidakra/farbie:v1.1.0 /bin/bash 
#
# 5) Within the container check that the application.conf is right and start FaRBIE  ./bin/farbie
#
# 6) Detach from the container with Ctrl-p Ctrl-q
#
# The container can be started in detached mode executing the command
#
# $ docker run -d -p 9000:9000 --network=farbie-net --volumes-from farbie-conf --name farbie lidakra/farbie:v1.1.0


# Pull base image
#FROM ubuntu:15.04
FROM ubuntu
MAINTAINER Luigi Selmi <collarad@gmail.com>

#RUN apt-get update && apt-get -y install locales
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Install Java 8.
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y  software-properties-common && \
    add-apt-repository ppa:webupd8team/java -y && \
    apt-get update && \
    echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections && \
    apt-get install -y oracle-java8-installer && \
    apt-get clean

# Define JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# Install  network tools (ifconfig, netstat, ping, ip)
RUN apt-get update && \
    apt-get install -y net-tools && \
    apt-get install -y iputils-ping && \
    apt-get install -y iproute2

# Install vi for editing
RUN apt-get update && \
    apt-get install -y vim

# Copy OCCRP SSL Certificate
COPY  certs/dataoccrporg.crt $JAVA_HOME/jre/lib/security/

# Install the OCCRP SSL certificate
WORKDIR $JAVA_HOME/jre/lib/security/
RUN keytool -importcert -alias occrp -keystore cacerts -storepass changeit -file dataoccrporg.crt -noprompt

#Install FaRBIE package from the project folder (create a package using "sbt universal:package-zip-tarball" command)
COPY target/universal/farbie-1.1.0.tgz /home/lidakra/
WORKDIR /home/lidakra/
RUN tar xvf farbie-1.1.0.tgz  


# Copy the schema folder (as sbt universal package does not include it by default)
COPY schema/ /home/lidakra/farbie-1.1.0/schema/

# Start FaRBIE
COPY start_farbie.sh /home/lidakra/farbie-1.1.0
WORKDIR /home/lidakra/farbie-1.1.0
RUN ["chmod", "u+x", "start_farbie.sh"]
CMD ./start_farbie.sh
