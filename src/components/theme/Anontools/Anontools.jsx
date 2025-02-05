import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useToken } from '@plone/volto/hooks/userSession/useToken';
import { useContent } from '@plone/volto/hooks/content/useContent';
import config from '@plone/volto/registry';

const Anontools = () => {
  const token = useToken();
  const { data: content } = useContent();

  const { settings } = config;
  return (
    !token && (
      <Menu pointing secondary floated="right">
        <Menu.Item>
          <Link
            aria-label="login"
            to={`/login${
              content?.['@id']
                ? `?return_url=${flattenToAppURL(content['@id'])}`
                : ''
            }`}
          >
            <FormattedMessage id="Log in" defaultMessage="Log in" />
          </Link>
        </Menu.Item>
        {settings.showSelfRegistration && (
          <Menu.Item>
            <Link aria-label="register" to="/register">
              <FormattedMessage id="Register" defaultMessage="Register" />
            </Link>
          </Menu.Item>
        )}
      </Menu>
    )
  );
};

export default Anontools;

Anontools.propTypes = {
  token: PropTypes.string,
  content: PropTypes.shape({
    '@id': PropTypes.string,
  }),
};

Anontools.defaultProps = {
  token: null,
  content: {
    '@id': null,
  },
};
