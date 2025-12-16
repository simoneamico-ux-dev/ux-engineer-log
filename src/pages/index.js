import React from 'react';
import { Redirect } from '@docusaurus/router';

export default function Home() {
  // Redirect immediato alla documentazione (Progetto Principale)
  return <Redirect to="/docs/Featured/rpg-creature-search-app" />;
}