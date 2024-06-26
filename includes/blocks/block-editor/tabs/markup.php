<?php
/**
 * Markup for the Tabs block wrapper
 *
 * @package PublisherMediaKit\Blocks
 */

$class_names = array(
	'wp-block-newspack-tabs',
	'tabs',
	'horizontal',
	! empty( $attributes['align'] ) ? 'alignwide' : null,
	! empty( $attributes['className'] ) ? $attributes['className'] : null,
);
?>
<div class="<?php echo esc_attr( implode( ' ', array_filter( $class_names ) ) ); ?>">
	<!-- Tabs Placeholder -->
	<div class="tab-group">
		<?php echo wp_kses_post( $content ); ?>
	</div> <!-- /.tab-group -->
</div> <!-- /.tabs -->
