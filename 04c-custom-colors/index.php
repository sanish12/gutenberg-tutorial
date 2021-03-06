<?php

add_action( 'init', function() {
  // if Gutenberg is not active
  if ( !function_exists( 'register_block_type' ) ) {
    return;
  }

  // If this code is in Theme, replace this with `get_stylesheet_directory_uri()`
  $js_dir = plugin_dir_url( __FILE__ );
  $css_dir = plugin_dir_url( __FILE__ );

  wp_register_script( 'tut-04c', $js_dir . '/04c.js', [ 'wp-blocks', 'wp-dom' ] , null, true );
  wp_register_style( 'tut-04c', $css_dir . '/04c.css', [ 'wp-edit-blocks' ] );

  register_block_type( 'my/tut-04c', [
    'editor_style' => 'tut-04c',
    'editor_script' => 'tut-04c',
  ] );
} );


/**
 * Fixed bug with Gutenberg not allowing custom inline-style
 * 
 * https://github.com/WordPress/gutenberg/issues/15137
 */
add_filter( 'safe_style_css', function() {
  $attr[] = '--bgColor';
  $attr[] = '--textColor';
  return $attr;
} );