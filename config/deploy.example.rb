
set :application, "quirkey_portfolio"
set :deploy_via, :remote_cache
set :monit_group, 'quirkey_portfolio'
set :user, 'user'
set :runner, user

set :scm, :git
set :repository, "git@github.com:quirkey/portfolio.git"
set :branch, 'master'
set :git_enable_submodules, 1
set :keep_releases, 3
set :deploy_to, "/var/www/apps/#{application}"

server "domain.net", :web, :app, :db, :primary => true


namespace :deploy do
  task :restart do
    monit.restart
  end

  desc 'own the whole directory'
  task :own do
    sudo "chown -R #{user} #{deploy_to}"
  end
end

namespace :monit do
  task :restart do
    sudo "monit restart -g #{monit_group} all"
  end
end
