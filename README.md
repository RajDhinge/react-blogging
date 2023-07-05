# Wordpress Decoupled + React

## Prerequisites

Before getting started with the Wordpress Decoupled + React setup, make sure you have the following prerequisites in place:

- **JWT Authentication for WP REST API**: Install and activate the JWT Authentication for WP REST API plugin from [wordpress.org/plugins/jwt-authentication-for-wp-rest-api/](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/).

## JWT Setup

To enable JWT authentication and configure the necessary settings, follow these steps:

1. Open the `wp-config.php` file in your Wordpress installation.

2. Add the following code at the end of the file:

   ```php
   define('JWT_AUTH_SECRET_KEY', '&BZd]N-ghz|hbH`=%~a5z(`mR=n%7#8-Iz@KoqtDhQ6(8h$og%-IbI#>N*T`s9Dg');
   define('JWT_AUTH_CORS_ENABLE', true);
   ```

   This code sets the JWT secret key and enables CORS for JWT authentication.

3. Open the `.htaccess` file located in the root directory of your Wordpress installation.

4. Add the following code inside the `<IfModule mod_rewrite.c>` block:

   ```apacheconf
   RewriteCond %{HTTP:Authorization} ^(.*)
   RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
   SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
   ```

   This code ensures that the `Authorization` header is properly passed to Wordpress.

   Your `.htaccess` file should now look similar to this:

   ```apacheconf
   <IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteBase /wordpress/
   RewriteRule ^index\.php$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /wordpress/index.php [L]
   
   RewriteCond %{HTTP:Authorization} ^(.*)
   RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
   SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
   
   </IfModule>
   ```

With these steps completed, you have successfully set up JWT authentication for the WP REST API and made the necessary configurations in Wordpress.

Remember to save the modified files and ensure that your Wordpress installation is accessible at the correct URL (`/wordpress/` in the provided example).

Feel free to adjust the instructions according to your specific setup or requirements.

**Note**: Make sure to properly secure your JWT secret key and follow best practices for Wordpress security.