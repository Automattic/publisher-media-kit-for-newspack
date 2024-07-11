<?php
/**
 * Gutenberg Blocks setup
 *
 * @package PublisherMediaKit/Blocks
 */

namespace PublisherMediaKit\Blocks;

/**
 * Set up blocks
 *
 * @return void
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'init', $n( 'register_blocks' ) );

	add_action( 'init', $n( 'block_patterns_and_categories' ) );

}

/**
 * Add in blocks that are registered in this plugin
 *
 * @return void
 */
function register_blocks() {
	// Require custom blocks.
	require_once PUBLISHER_MEDIA_KIT_BLOCKS_PATH . '/tabs/register.php';

	// Call block register functions for each block.
	Tabs\register();

	// Require custom blocks.
	require_once PUBLISHER_MEDIA_KIT_BLOCKS_PATH . '/tabs-item/register.php';

	// Call block register functions for each block.
	TabsItem\register();
}

/**
 * Manage block patterns and block pattern categories
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/
 *
 * @return void
 */
function block_patterns_and_categories() {
	// phpcs:disable

	// Register block pattern category for Publisher Media Kit.
	register_block_pattern_category(
		'publisher-media-kit',
		array( 'label' => __( 'Newspack Media Kit', 'publisher-media-kit' ) )
	);

	global $wp_version;

	// Register block pattern for the intro.
	ob_start();
	include_once PUBLISHER_MEDIA_KIT_BLOCK_PATTERS . 'intro.php';
	$intro = ob_get_clean();
	register_block_pattern(
		'publisher-media-kit/intro',
		array(
			'title'       => __( 'Media Kit - Intro', 'publisher-media-kit' ),
			'description' => __( 'The intro section for the Media Kit page.', 'publisher-media-kit' ),
			'categories'  => [ 'publisher-media-kit' ],
			'content'     => wp_kses_post( $intro ),
		)
	);

	// Register block pattern for the audience.
	ob_start();
	include_once PUBLISHER_MEDIA_KIT_BLOCK_PATTERS . 'audience.php';
	$audience = ob_get_clean();
	register_block_pattern(
		'publisher-media-kit/audience',
		array(
			'title'       => __( 'Media Kit - Audience', 'publisher-media-kit' ),
			'description' => __( 'A 3-column layout showing the audience.', 'publisher-media-kit' ),
			'categories'  => [ 'publisher-media-kit' ],
			'content'     => wp_kses_post( $audience ),
		)
	);

	// Register block pattern for why us.
	ob_start();
	include_once PUBLISHER_MEDIA_KIT_BLOCK_PATTERS . 'why-us.php';
	$why_us = ob_get_clean();
	register_block_pattern(
		'publisher-media-kit/why-us',
		array(
			'title'       => __( 'Media Kit - Why Us?', 'publisher-media-kit' ),
			'description' => __( 'A 2-column layout for the "Why Us?" section.', 'publisher-media-kit' ),
			'categories'  => [ 'publisher-media-kit' ],
			'content'     => wp_kses_post( $why_us ),
		)
	);

	// Register block pattern for tabs with table structure for the ad specs.
	ob_start();
	include_once PUBLISHER_MEDIA_KIT_BLOCK_PATTERS . 'ad-specs.php';
	$ad_specs = ob_get_clean();
	register_block_pattern(
		'publisher-media-kit/ad-specs',
		array(
			'title'       => __( 'Media Kit - Ad Specs', 'publisher-media-kit' ),
			'description' => __( 'Ad Specs tabular structure with tabs management.', 'publisher-media-kit' ),
			'categories'  => [ 'publisher-media-kit' ],
			'content'     => wp_kses_post( $ad_specs ),
		)
	);

	// Register block pattern for tabs with table structure for the rates.
	ob_start();
	include_once PUBLISHER_MEDIA_KIT_BLOCK_PATTERS . 'rates.php';
	$rates = ob_get_clean();
	register_block_pattern(
		'publisher-media-kit/rates',
		array(
			'title'       => __( 'Media Kit - Rates', 'publisher-media-kit' ),
			'description' => __( 'Rates tabular structure with tabs management.', 'publisher-media-kit' ),
			'categories'  => [ 'publisher-media-kit' ],
			'content'     => wp_kses_post( $rates ),
		)
	);

	// Register block pattern for the packages section.
	ob_start();
	include_once PUBLISHER_MEDIA_KIT_BLOCK_PATTERS . 'packages.php';
	$packages = ob_get_clean();
	register_block_pattern(
		'publisher-media-kit/packages',
		array(
			'title'       => __( 'Media Kit - Packages', 'publisher-media-kit' ),
			'description' => __( 'Packages layout with a short note and a 3-column layout.', 'publisher-media-kit' ),
			'categories'  => [ 'publisher-media-kit' ],
			'content'     => wp_kses_post( $packages ),
		)
	);

	// Register block pattern for the contact (compact) section.
	ob_start();
	include_once PUBLISHER_MEDIA_KIT_BLOCK_PATTERS . 'contact-compact.php';
	$contact_compact = ob_get_clean();
	register_block_pattern(
		'publisher-media-kit/contact-compact',
		array(
			'title'       => __( 'Media Kit - Contact (Compact)', 'publisher-media-kit' ),
			'description' => __( 'A compact Call-To-Action to get in touch.', 'publisher-media-kit' ),
			'categories'  => [ 'publisher-media-kit' ],
			'content'     => wp_kses_post( $contact_compact ),
		)
	);

	// Register block pattern for the contact section.
	ob_start();
	include_once PUBLISHER_MEDIA_KIT_BLOCK_PATTERS . 'contact.php';
	$contact = ob_get_clean();
	register_block_pattern(
		'publisher-media-kit/contact',
		array(
			'title'       => __( 'Media Kit - Contact', 'publisher-media-kit' ),
			'description' => __( 'A Call-To-Action to get in touch.', 'publisher-media-kit' ),
			'categories'  => [ 'publisher-media-kit' ],
			'content'     => wp_kses_post( $contact ),
		)
	);

	// phpcs:enable
}
