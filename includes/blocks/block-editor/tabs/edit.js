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
import { useState, useEffect } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { editPropsShape } from './props-shape';

import './editor.css';

const TabsEdit = (props) => {
	const {
		attributes: { tabVertical, tabsTitle },
		setAttributes,
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
	const orientation = tabVertical ? 'vertical' : 'horizontal';
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
			`#block-${clientId} > .wp-block-tenup-tabs .wp-block[data-is-tab-header-editing]`,
		);
		if (isEditing) {
			isEditing.forEach((block) => block.removeAttribute('data-is-tab-header-editing'));
		}
	};

	const DisplayTabPanel = () => {
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
						label={header || __('Tab Header', '10up-block-library')}
						onClick={() => {
							resetEditing();
							onSelect(clientId);
							// eslint-disable-next-line prettier/prettier
							document.getElementById(`block-${clientId}`).setAttribute('data-is-tab-header-editing', 1);
						}}
					>
						{header || __('Tab Header', '10up-block-library')}
					</Button>
				</Fragment>
			);
		});

		/**
		 * Hacky solution to positioning the tab header in the correct place
		 */
		useEffect(() => {
			innerBlocks.forEach((innerBlock) => {
				const tabHeader = document.querySelector(
					`.tab-header[data-tab-block="${innerBlock.clientId}"]`,
				);
				const tabHeaderButton = document.querySelector(
					`.components-tab-panel__tabs-item[data-tab-block="${innerBlock.clientId}"]`,
				);

				const positionInfo = tabHeaderButton.getBoundingClientRect();

				if (tabHeader && tabHeaderButton) {
					if (orientation === 'horizontal') {
						// console.log(`${header} - Move to ${tabHeaderButton.offsetLeft}`);
						tabHeader.style.left = `${tabHeaderButton.offsetLeft}px`;
						tabHeader.style.width = `${positionInfo.width - 2}px`;
						tabHeader.style.top = '-58px';

						// debugger;
					} else {
						tabHeader.style.top = `${tabHeaderButton.offsetTop}px`;
						tabHeader.style.left = '-118px';
						tabHeader.style.width = '120px';
					}
				}
			});
		});

		return (
			<Fragment className="alignwide">
				<RichText
					tagName="p"
					className="pmk-tabs-title"
					onChange={(newTitle) => setAttributes({ tabsTitle: newTitle })}
					value={tabsTitle}
				/>
				<NavigableMenu
					stopNavigationEvents
					eventToOffset={() => {
						return false;
					}}
					role="tablist"
					orientation={orientation}
					className="components-tab-panel__tabs"
				>
					{tabPanels}
					<Button
						className="add-tab-button"
						icon="plus"
						label={__('Add New Tab', '10up-block-library')}
						onClick={() => {
							const created = createBlock(
								'tenup/tabs-item',
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
			</Fragment>
		);
	};

	const orientationOptions = () => {
		return (
			<InspectorControls>
				{applyFilters('tenup.tabs.showOrientationOption', true, clientId) ? (
					<PanelBody title={__('Orientation Options', '10up-block-library')}>
						<ToggleControl
							label={__('Vertical Layout', '10up-block-library')}
							checked={tabVertical}
							onChange={() => setAttributes({ tabVertical: !tabVertical })}
						/>
					</PanelBody>
				) : (
					''
				)}
			</InspectorControls>
		);
	};

	return (
		<>
			{orientationOptions()}

			<div className={`${className} ${classes} tabs-${orientation}`}>
				<FilterableTabsHeader blockProps={props} />
				{DisplayTabPanel()}
				<div className="tab-group">
					<InnerBlocks
						orientation={orientation}
						allowedBlocks={['tenup/tabs-item']}
						// eslint-disable-next-line prettier/prettier
						template={[['tenup/tabs-item', { header: '' }, [[ 'core/paragraph', {} ]]]]}
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
