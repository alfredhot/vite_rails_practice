FROM ruby:3.1.2

RUN apt-get install -y curl
RUN echo "$(sed -e 's/deb.debian.org/ftp.kr.debian.org/g' /etc/apt/sources.list)" > /etc/apt/sources.list
# Install dependencies
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
        echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y build-essential libpq-dev nginx-extras  imagemagick libmagickwand-dev libssl-dev libreadline-dev nodejs libffi-dev yarn vim net-tools libsnappy-dev
RUN apt-get clean && rm -rf /var/cache/apt/archives && rm -rf /var/lib/apt/lists

ENV RAILS_ROOT /var/www
WORKDIR $RAILS_ROOT
COPY Gemfile $RAILS_ROOT/Gemfile
COPY package.json $RAILS_ROOT/package.json
RUN yarn install
RUN bundle install -j4

EXPOSE 80
CMD ["./development_startup.sh"]