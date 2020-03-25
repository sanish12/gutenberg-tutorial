/*
  Tutorial 06 - Dynamic Block

  - Learn how to make a block where the HTML markup is dynamic like Latest Posts.
  - Learn how to do API Call
  
  TASK:
    Create a block to show latest X posts of selected category. Use `<select>` and `<input type="number">`

    To make it dynamic, make save() returns null.
  
  REFERENCE:
  - https://developer.wordpress.org/block-editor/tutorials/block-tutorial/creating-dynamic-blocks/
  - https://www.youtube.com/watch?v=sYHYTk0jeE8
*/
( function( blocks, editor, element, components ) { 'use strict';

const el = element.createElement;

blocks.registerBlockType( 'wpbt/tut-06', {
  title: '06 - Dynamic Block',
  icon: 'book',
  category: 'layout',

  // Attributes for Latest Posts
  attributes: {
    postsPerPage: { type: 'string' },
    selectedCategory: { type: 'string' },
    categories: { type: 'object' },
  },

  edit: function( props ) {
    var atts = props.attributes;
    
    // Get list of categories if doesn't exists yet
    if( !atts.categories ) {
      wp.apiFetch( {
        url: '/wp-json/wp/v2/categories',
      } ).then( categories => {
        props.setAttributes( { categories: categories } );
      } )
    }

    // If categories not yet loaded
    if( !atts.categories ) {
      return 'Loading...';
    }

    // If no categories found
    if( atts.categories && atts.categories.length <= 0 ) {
      return 'No categories found, please add some';
    }


    return el( 'div', {},
      // Category select
      el( 'select',
        {
          value: atts.selectedCategory,
          onChange: (e) => {
            props.setAttributes( { selectedCategory: e.target.value } );
          }
        },
        [
          el( 'option', { value: '' }, 'Select a Category' ),
          ...atts.categories.map( category => {
            return (
              el( 'option', { value: category.id, key: category.id }, category.name )
            );
          } )
        ]
      ),
      
      // Input for postsPerPage
      el( 'input', {
        value: atts.postsPerPage,
        placeholder: 'Posts per Page',
        type: 'number',
        
        // onBlur is triggered when the field lose focus (even if value doesn't change)
        //   Use onChange if you want it to trigger while you type
        onChange: (e) => {
          props.setAttributes( { postsPerPage: e.target.value } );
        }
      }),
    );
  },

  // Let the gutenberg know that this will be rendered via render_callback in PHP
  // Or you can simply remove this function
  save: function( props ) {
    return null
  }

} );

} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components );