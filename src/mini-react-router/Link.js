export default function Link({to, children }) {
  console.log('link',to);
  return <a href={to}>{children}</a>;
  
}
