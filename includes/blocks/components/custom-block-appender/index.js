/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { Inserter } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { plus } from '@wordpress/icons';

/**
 * CustomBlockAppender.
 *
 * Provide a Button component to trigger the inserter.
 * Any undocumented props are spread onto the Button component.
 *
 * @param {Object} props              All props sent to this component.
 * @param {string} props.rootClientId Client ID of the block where this is being used.
 * @param {string} [props.buttonText] Text to display in the Button.
 * @param {string} [props.icon]       The icon to use.
 * @return {Function} The component.
 */
const CustomBlockAppender = ({ rootClientId, buttonText, ...buttonProps }) => {
	return (
		<Inserter
			isAppender
			rootClientId={rootClientId}
			renderToggle={({ onToggle, disabled }) => (
				<Fragment>
					<Button onClick={onToggle} disabled={disabled} {...buttonProps}>
						{buttonText}
					</Button>
				</Fragment>
			)}
		/>
	);
};

CustomBlockAppender.propTypes = {
	rootClientId: PropTypes.string.isRequired,
	buttonText: PropTypes.string,
	label: PropTypes.string,
	variant: PropTypes.string,
	icon: PropTypes.string,
	size: PropTypes.string,
};

CustomBlockAppender.defaultProps = {
	buttonText: '',
	label: '',
	variant: 'primary',
	icon: plus,
	size: 'small',
};

export default CustomBlockAppender;
