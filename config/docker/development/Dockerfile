FROM ruby:3.1.2

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#    && wget -O /etc/apt/sources.list mirrors.tencentyun.com/repo/ubuntu20_sources.list \
RUN yarn config set registry https://registry.npm.taobao.org
RUN apt-get update -qq && \
    apt-get install -y build-essential yarn

# RUN apt-get update -qq && apt-get install -y build-essential yarn
COPY ./ /www/vite_test

WORKDIR /www/vite_test
RUN bundle install -j4
RUN yarn install

EXPOSE 80
CMD bin/rails s