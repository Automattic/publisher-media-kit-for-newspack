/* eslint-disable react/jsx-props-no-spreading */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Wordpress dependencies
 */
/* eslint-disable import/no-extraneous-dependencies */
import { createBlock } from '@wordpress/blocks';
import { compose, ifCondition } from '@wordpress/compose';
import { useState, useEffect, Fragment } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { Button, NavigableMenu } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import { InnerBlocks } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import createFilterableComponent from '../../utils/createFilterableComponent';
import { editPropsShape } from './props-shape';

import './editor.css';

const FilterableTabsHeader = createFilterableComponent('newspack.tabs.header');
const FilterableTabsFooter = createFilterableComponent('newspack.tabs.footer');

const TabsEdit = (props) => {
	const {
		isSelected,
		className,
		clientId,
		block,
		selectBlock,
		insertBlock,
		removeBlock,
		activeClass = 'is-active',
	} = props;
	const { innerBlocks } = block;
	const [tabCount, setTabCount] = useState(innerBlocks.length);
	const [editTab, setEditTab] = useState('');

	const classes = classnames({
		border: !isSelected,
		'components-tab-panel__tabs-item-is-editing': editTab,
	});

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		const firstBlock = innerBlocks.length > 0 ? innerBlocks[0].clientId : null;

		// When last tab item is deleted
		if (innerBlocks.length < 1 && tabCount > innerBlocks.length) {
			removeBlock(clientId);
		}

		// Action when tab is deleted
		if (innerBlocks.length > 0 && tabCount > innerBlocks.length) {
			selectBlock(firstBlock);

			// reset count
			setTabCount(innerBlocks.length);
		}

		// Hacky but required in order to select which is the innerblocks assigned to header
		if (editTab) {
			document.getElementById(`block-${clientId}`).classList.add('is-tab-editing');
			// eslint-disable-next-line prettier/prettier
			if ( document.getElementById(`block-${editTab}`) ) {
				// eslint-disable-next-line prettier/prettier
				document.getElementById(`block-${editTab}`).setAttribute('data-is-tab-header-editing', 1);
			}
		}
	}, [
		selectBlock,
		clientId,
		tabCount,
		setTabCount,
		editTab,
		block,
		innerBlocks,
		removeBlock,
		activeClass,
	]);

	const onSelect = (tabName) => {
		// Set selected tab
		setEditTab(tabName);
		selectBlock(tabName);
	};

	const resetEditing = () => {
		const isEditing = document.querySelectorAll(
			`#block-${clientId} > .wp-block-newspack-tabs .wp-block[data-is-tab-header-editing]`,
		);
		if (isEditing) {
			isEditing.forEach((block) => block.removeAttribute('data-is-tab-header-editing'));
		}
	};

	const DisplayTabPanel = () => {
		// eslint-disable-next-line react/prop-types
		const tabPanels = innerBlocks.map((innerBlock) => {
			const { attributes, clientId } = innerBlock;
			const { header } = attributes;
			return (
				<Fragment key={clientId}>
					<Button
						orientation="horizontal"
						data-tab-block={clientId}
						className={classnames(
							'tab-item',
							{ untitled: !header },
							'components-tab-panel__tabs-item',
						)}
						label={header || __('Tab Header', 'publisher-media-kit')}
						onClick={() => {
							resetEditing();
							onSelect(clientId);
							// eslint-disable-next-line prettier/prettier
							document.getElementById(`block-${clientId}`).setAttribute('data-is-tab-header-editing', 1);
						}}
					>
						{decodeEntities(header) || __('Tab Header', 'publisher-media-kit')}
					</Button>
				</Fragment>
			);
		});

		/**
		 * Hacky solution to positioning the tab header in the correct place
		 */
		useEffect(() => {
			// eslint-disable-next-line react/prop-types
			innerBlocks.forEach((innerBlock) => {
				const tabHeader = document.querySelector(
					`.tab-header[data-tab-block="${innerBlock.clientId}"]`,
				);
				const tabHeaderButton = document.querySelector(
					`.components-tab-panel__tabs-item[data-tab-block="${innerBlock.clientId}"]`,
				);

				if (!tabHeaderButton) {
					return;
				}

				if (tabHeader && tabHeaderButton) {
					tabHeader.style.left = `${tabHeaderButton.offsetLeft}px`;
					tabHeader.style.top = `-${tabHeader.offsetHeight + 24}px`;

					// For some reason with the Classic Theme, if tabHeader is empty we're 4px off. 
					if ( document.body.classList.contains('theme-newspack-theme/newspack-theme') && tabHeader.querySelector( 'span' ) ) {
						tabHeader.style.top = `-${tabHeader.offsetHeight + 28}px`;
					}

				}
			});
		});

		return (
			<div className="tab-control">
				<div className="tabs-header">
					<NavigableMenu
						stopNavigationEvents
						eventToOffset={() => {
							return false;
						}}
						role="tablist"
						orientation="horizontal"
						className="components-tab-panel__tabs tab-list"
					>
						{tabPanels}
						<Button
							className="add-tab-button"
							icon={plus}
							label={__('Add New Tab', 'publisher-media-kit')}
							variant="secondary"
							size="small"
							onClick={() => {
								// eslint-disable-next-line react/prop-types
								const created = createBlock(
									'newspack/tabs-item',
									{
										header: '',
									},
									// eslint-disable-next-line prettier/prettier
								[
									createBlock(
										'core/paragraph',
									),
									]
								);
								insertBlock(created, undefined, clientId);
								resetEditing();
								onSelect(created.clientId);
							}}
						/>
					</NavigableMenu>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className={`${className} ${classes} tabs-horizontal`}>
				<FilterableTabsHeader blockProps={props} />
				{DisplayTabPanel()}
				<div className="tab-group">
					<InnerBlocks
						orientation="horizontal"
						allowedBlocks={['newspack/tabs-item']}
						// eslint-disable-next-line prettier/prettier
						template={[['newspack/tabs-item', { header: '' }, [[ 'core/paragraph', {} ]]]]}
						templateInsertUpdatesSelection
						__experimentalCaptureToolbars
					/>
				</div>
				<FilterableTabsFooter blockProps={props} />
			</div>
		</>
	);
};

TabsEdit.propTypes = {
	...editPropsShape,
};

export default compose(
	withSelect((select, { clientId }) => {
		const { getBlock } = select('core/block-editor');

		return {
			block: getBlock(clientId),
		};
	}),
	withDispatch((dispatch) => {
		const { selectBlock, insertBlock, removeBlock } = dispatch('core/block-editor');
		return {
			selectBlock: (id) => selectBlock(id),
			insertBlock,
			removeBlock,
		};
	}),
	ifCondition(({ block }) => {
		return block && block.innerBlocks;
	}),
)(TabsEdit);
