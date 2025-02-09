<?php
/**
 * Plugin Name:       Publisher Media Kit for Newspack
 * Plugin URI:        https://github.com/Automattic/publisher-media-kit-for-newspack
 * Description:       Pre-configured Media Kit Page using Gutenberg Block Patterns.
 * Version:           2.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            10up, Automattic
 * Author URI:        https://automattic.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       publisher-media-kit
 * Domain Path:       /languages
 *
 * @package           PublisherMediaKit
 */

// Useful global constants.
define( 'PUBLISHER_MEDIA_KIT_VERSION', '2.0' );
define( 'PUBLISHER_MEDIA_KIT_URL', plugin_dir_url( __FILE__ ) );
define( 'PUBLISHER_MEDIA_KIT_PATH', plugin_dir_path( __FILE__ ) );
define( 'PUBLISHER_MEDIA_KIT_BLOCKS_PATH', plugin_dir_path( __FILE__ ) . 'includes/blocks/block-editor/' );
define( 'PUBLISHER_MEDIA_KIT_INC', PUBLISHER_MEDIA_KIT_PATH . 'includes/' );
define( 'PUBLISHER_MEDIA_KIT_BLOCK_PATTERS', PUBLISHER_MEDIA_KIT_PATH . 'includes/block-patterns/' );

/**
 * Get the minimum version of PHP required by this plugin.
 *
 * @return string Minimum version required.
 */
function pmk_minimum_php_requirement() {
	return '7.4';
}

/**
 * Checks whether PHP installation meets the minimum requirements.
 *
 * @return bool true if meets minimum requirements, false otherwise.
 */
function pmk_site_meets_php_requirements() {
	return version_compare( phpversion(), pmk_minimum_php_requirement(), '>=' );
}

// Check minimum PHP version.
if ( ! pmk_site_meets_php_requirements() ) {
	add_action(
		'admin_notices',
		function() {
			?>
			<div class="notice notice-error">
				<p>
					<?php
					echo wp_kses_post(
						sprintf(
							/* translators: %s: Minimum required PHP version */
							__( 'Publisher Media Kit requires PHP version %s or later. Please upgrade PHP or disable the plugin.', 'publisher-media-kit' ),
							esc_html( pmk_minimum_php_requirement() )
						)
					);
					?>
				</p>
			</div>
			<?php
		}
	);

	return;
}

// Require Composer autoloader if it exists.
if ( file_exists( PUBLISHER_MEDIA_KIT_PATH . 'vendor/autoload.php' ) ) {
	require_once PUBLISHER_MEDIA_KIT_PATH . 'vendor/autoload.php';
}

// Include files.
require_once PUBLISHER_MEDIA_KIT_INC . '/core.php';
// Block Editor
require_once PUBLISHER_MEDIA_KIT_INC . '/blocks.php';

// Activation/Deactivation.
register_activation_hook( __FILE__, '\PublisherMediaKit\Core\activate' );
register_deactivation_hook( __FILE__, '\PublisherMediaKit\Core\deactivate' );

// Bootstrap.
PublisherMediaKit\Core\setup();
// Blocks
PublisherMediaKit\Blocks\setup();

/*
 * Please note the lowercase B in the blocks portion of the namespace.
 *
 * Due to an earlier typo in the blocks folder name (it uses a lower case b),
 * that part of the namespace is lowercase. This is to avoid breaking existing
 * code that may be referencing this file directly.
 *
 * Namespaces are case insensitive whereas file systems can be case sensitive so
 * the namespace case was modified to match the folder name.
 *
 * @see https://github.com/10up/publisher-media-kit/issues/118
 */
PublisherMediaKit\blocks\BlockContext\Tabs::get_instance()->setup();
