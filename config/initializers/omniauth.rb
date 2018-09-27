OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '132047720196-asv2h2gt9agofuudbvrpk2v4dci1j11l.apps.googleusercontent.com', '1wyetaSV-HklqQTCfJXJN7ZH', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
