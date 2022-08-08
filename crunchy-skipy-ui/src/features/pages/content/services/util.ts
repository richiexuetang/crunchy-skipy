export const getService = () => {
  if (window.location.hostname.includes('beta')) {
    return 'crunchyroll-beta';
  }
  return 'crunchyroll';
}