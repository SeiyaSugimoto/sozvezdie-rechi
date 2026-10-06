/** Decorative, code-native constellation motif shared across the brand. */
export function Star({className=''}:{className?:string}){
 return <svg className={`brand-star ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 1.5 14.8 9.2 22.5 12l-7.7 2.8-2.8 7.7-2.8-7.7L1.5 12l7.7-2.8Z"/></svg>;
}
export function BrandMark(){
 return <svg className="brand-mark" viewBox="0 0 52 52" aria-hidden="true" focusable="false"><path d="M9 35 26 12 43 26 32 43" fill="none" stroke="#87b5cc" strokeWidth="1.3"/><path d="m26 3 2.5 6.5L35 12l-6.5 2.5L26 21l-2.5-6.5L17 12l6.5-2.5Z" fill="#dfb957"/><path d="m43 20 1.7 4.3L49 26l-4.3 1.7L43 32l-1.7-4.3L37 26l4.3-1.7Z" fill="#dfb957"/><circle cx="9" cy="35" r="3" fill="#dcb657"/><circle cx="32" cy="43" r="2.5" fill="#93bed3"/></svg>;
}
export function Constellation({className=''}:{className?:string}){
 return <svg className={`constellation ${className}`} viewBox="0 0 320 320" fill="none" aria-hidden="true" focusable="false"><path d="M38 218 112 130 194 162 262 54M112 130 80 40M194 162 270 270" stroke="currentColor" strokeWidth="1"/><g fill="#e1bb60"><path d="m112 117 3.7 9.3 9.3 3.7-9.3 3.7-3.7 9.3-3.7-9.3-9.3-3.7 9.3-3.7Z"/><path d="m262 45 2.6 6.4L271 54l-6.4 2.6-2.6 6.4-2.6-6.4L253 54l6.4-2.6Z"/><path d="m270 262 2.3 5.7 5.7 2.3-5.7 2.3-2.3 5.7-2.3-5.7-5.7-2.3 5.7-2.3Z"/><circle cx="38" cy="218" r="3"/><circle cx="80" cy="40" r="2.5"/><circle cx="194" cy="162" r="3.5"/></g></svg>;
}
