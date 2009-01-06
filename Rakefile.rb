namespace :portfolio do
  task :resize_images do
    require 'imanip'
    dir = File.expand_path(File.join(File.dirname(__FILE__), 'public', 'images', 'projects'))
    Dir[File.join(dir, '*_large.jpg')].each do |large_path|
      dimensions = {:medium => [358,211], :thumb => [220, 130], :small => [160, 94]}
      name = File.basename(large_path).gsub('_large.jpg','')
      image = Imanip::Image.new(large_path)
      dimensions.each do |size, w_h|
        puts "resizing #{name} to #{size}"
        image.resize(File.join(dir, "#{name}_#{size}.jpg"), :dimensions => w_h)
      end
    end
  end
end