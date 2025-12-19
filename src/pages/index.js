import React from 'react';
import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home() {
  const {i18n} = useDocusaurusContext();
  if (i18n.currentLocale === 'it') {
    return <Redirect to="/it/docs/Featured/ux-engineer-log" />;
  }
  return <Redirect to="/docs/Featured/ux-engineer-log" />;
}