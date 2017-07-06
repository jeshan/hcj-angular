module.exports = {
  apps: [
    {
      name: 'hcj-starter-client',
      script: 'serve',
      instance_var: 'hcj-starter-client',
      'env': {
        'PM2_SERVE_PATH': 'dist',
        'PM2_SERVE_PORT': 3000
      }
    }
  ]
};
