json.extract! event, :id, :title, :description, :date, :latitude, :longitude, :imgURL, :host_id_id, :created_at, :updated_at
json.url event_url(event, format: :json)
