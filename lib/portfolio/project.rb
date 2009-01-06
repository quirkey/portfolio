module Portfolio
  class Project < StaticModel::Base
    set_data_file File.join('data', 'projects.yml')
    
    def to_s
      "#{title}"
    end
    
    def category_classes
      classes = []
      classes.concat technologies.compact.collect {|t| "tech_#{t.gsub(' ', '_')}" }
      classes.concat features.compact.collect {|t| "feature_#{t.gsub(' ', '_')}" }
      classes << "year_#{launched_at.year}" if launched_at
      classes
    end
    
    def description
      @attributes['description'] || ''
    end
    
    def project_type
      @attributes['project_type'] || nil
    end
    
    def launched_at
      launched ? Time.parse(launched) : false
    end
    
    def launched
      @attributes['launched'] || false
    end
    
    def links
      Array(@attributes['links']).collect do |l| 
        link, link_text = l.split('|')
        link_text ||= link
        [link_text, link]
      end
    end
    
    class << self
      
      def technologies
        @technologies ||= self.all.collect {|p| p.technologies.compact }.flatten.uniq.sort
      end
      
      def features
        @features ||= self.all.collect {|p| p.features.compact }.flatten.uniq.sort
      end
      
      def years
        @years ||= self.all.collect {|p| p.launched_at.year if p.launched_at }.compact.uniq.sort
      end
    end
  end
end