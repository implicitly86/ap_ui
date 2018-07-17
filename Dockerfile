FROM nginx

MAINTAINER Emil Murzakaev <murzakaev.emil.it@gmail.com>

ADD /dist/ /usr/share/nginx/html
ADD /nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

RUN echo "127.0.0.1 gateway" >> /etc/hosts

RUN sed -i.bak 's/listen\(.*\)80;/listen 8081;/' /etc/nginx/conf.d/default.conf
EXPOSE 8081

RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

USER nginx
