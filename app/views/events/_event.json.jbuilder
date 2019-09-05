json.extract! event, :id, :title, :description, :date, :latitude, :longitude, :imgURL, :user_id, :created_at, :updated_at
json.url event_url(event, format: :json)