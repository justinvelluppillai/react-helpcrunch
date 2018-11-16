import { Component } from 'react';
import PropTypes from 'prop-types';

const canUseDOM = !!(
    (typeof window !== 'undefined' &&
        window.document && window.document.createElement)
);

export const HelpCrunchAPI = (...args) => {
    if (canUseDOM && window.HelpCrunch) {
        window.HelpCrunch.apply(null, args);
    } else {
        console.warn('HelpCrunch not initialized yet');
    }
};

export default class HelpCrunch extends Component {
    static propTypes = {
        appID: PropTypes.string.isRequired,
        appSecret: PropTypes.string.isRequired
    };

    static displayName = 'HelpCrunch';

    constructor(props) {
        super(props);

        const {
            appID,
            appSecret,
            ...otherProps
        } = props;

        if (!appID || !canUseDOM) {
            return;
        }
      
        if (!window.HelpCrunch) {
            (function (w, d) {
                w.HelpCrunch = function () {
                    w.HelpCrunch.q.push(arguments);
                };
                w.HelpCrunch.q = [];

                function r() {
                    var s = d.createElement('script');
                    s.async = 1;
                    s.type = "text/javascript";
                    s.src = "https://widget.helpcrunch.com/";
                    (d.body || d.head).appendChild(s);
                }

                if (w.attachEvent) {
                    w.attachEvent('onload', r);
                } else {
                    w.addEventListener('load', r, false);
                }
            })(window, document);
        }

        window.HelpCrunchSettings = {...otherProps, applicationId: appID, applicationSecret: appSecret};

        if (window.HelpCrunch) {
            window.HelpCrunch('init', 'writemaps', window.HelpCrunchSettings);
            window.HelpCrunch('showChatWidget');
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            appID,
            appSecret,
            ...otherProps
        } = nextProps;

        if (!canUseDOM) {
            return;
        }

        window.HelpCrunchSettings = { ...otherProps, applicationId: appID, applicationSecret: appSecret }

        if (window.HelpCrunch) {
            if (this.loggedIn(this.props) && !this.loggedIn(nextProps)) {
                window.HelpCrunch('hideChatWidget');
                window.HelpCrunch('init', 'writemaps', window.HelpCrunchSettings);
            } else {
                window.HelpCrunch('updateUser', otherProps);
            }
            window.HelpCrunch('showChatWidget');
        }
    }

    componentWillUnmount() {
        if (!canUseDOM || !window.HelpCrunch) {
            return false;
        }

        window.HelpCrunch('hideChatWidget');

        delete window.HelpCrunch;
        delete window.HelpCrunchSettings;
    }

    loggedIn(props) {
        return props.email || props.user_id;
    }

    render() {
        return false;
    }
}


  componentWillUnmount() {
    if (!canUseDOM || !window.Intercom) return false;

    window.Intercom('shutdown');

    delete window.Intercom;
    delete window.intercomSettings;
  }

  loggedIn(props) {
    return props.email || props.user_id;
  }

  render() {
    return false;
  }
}
