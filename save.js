export function saveGame(){
 localStorage.setItem('stormprobe_save', JSON.stringify({
  money:5000,
  reputation:12
 }));
}

export function loadGame(){
 return JSON.parse(localStorage.getItem('stormprobe_save')||'{}');
}
