describe('Check if Media Kit Block Pattern is available for use', () => {
    it('Can insert the block pattern', () => {
        cy.visitAdminPage('post-new.php');
        cy.closeWelcomeGuide();
        cy.get('#post-title-0, h1.editor-post-title__input').click( { force: true } ).type('Test Block Pattern');
        cy.get('.edit-post-header-toolbar__inserter-toggle, .editor-document-tools__inserter-toggle').click();
        cy.get('.components-tab-panel__tabs button, .block-editor-inserter__tabs button').contains( 'Patterns' ).click();

        // (add version) If dropdown is available. (After WP 5.?)
        cy.get('body').then(($body) => {
            if ($body.find('.components-select-control__input').length > 0) {
                cy.get('.components-select-control__input').select('publisher-media-kit', {
                    force: true,
                });
            } else if ($body.find( '[aria-label="Publisher Media Kit"]' ).length > 0) {
                cy.get('[aria-label="Publisher Media Kit"]').click();
            }

            // Check if cover patter exist in the list
            cy.get('[aria-label="Publisher Media Kit - Cover"]').should('exist');
        });
    });
});
