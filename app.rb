require 'lib/portfolio'
require 'erubis'
require 'vendor/sinatra/lib/sinatra'
require 'RedCloth'

set :views,  'views'
set :public, 'public'

helpers do
  def project_image(project, size = :medium)
    %{<img src="/images/projects/#{project.slug}_#{size}.jpg" alt="#{project}"/>}
  end
  
  def textilize(content)
    RedCloth.new(content).to_html
  end
end

get '/' do
  @projects, @open_source_projects = Portfolio::Project.all.sort_by {|p| p.launched_at || Time.new }.reverse.partition {|p| p.project_type.nil? }
  erb :index
end

get '/project/:id' do
  @project = Portfolio::Project.find(params['id'].to_i)
  @layout = params['no_layout'] ? false : :layout
  erb :project, :layout => @layout
end