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

ENV USER=alfredhot
RUN groupadd -g 1001 $USER
RUN useradd -m -d /home/$USER -r -u 1001 -g $USER $USER
RUN chown -R $USER:$USER $RAILS_ROOT

USER $USER

COPY Gemfile Gemfile
COPY package.json package.json
RUN yarn install
RUN bundle install -j4

COPY --chown=$USER:$USER . .
RUN if [ ! -d "$RAILS_ROOT/tmp" ]; then  mkdir $RAILS_ROOT/tmp; fi && if [ ! -d "$RAILS_ROOT/tmp/pids" ]; then  mkdir $RAILS_ROOT/tmp/pids; fi && if [ ! -d "$RAILS_ROOT/tmp/sockets" ]; then  mkdir $RAILS_ROOT/tmp/sockets; fi && if [ ! -d "$RAILS_ROOT/log" ]; then  mkdir $RAILS_ROOT/log; fi
RUN chown -R $USER:$USER $RAILS_ROOT/tmp && chmod 755 $RAILS_ROOT/bin/* && chown $USER:$USER $RAILS_ROOT/Gemfile.lock

#RUN chmod 711 ./development-startup.sh
EXPOSE 80
CMD ./development-startup.sh