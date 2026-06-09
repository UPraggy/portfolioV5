// global/app.ts — boot hooks for portfoliov5

export default () => {
  // Ensure data-accent is set on <html> for CSS variables to switch
  const html = document.documentElement;
  if (!html.getAttribute('data-accent')) {
    html.setAttribute('data-accent', 'amber');
  }
};
