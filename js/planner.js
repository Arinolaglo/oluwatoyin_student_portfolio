document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form'), title = document.getElementById('task');
  const course = document.getElementById('course'), due = document.getElementById('due');
  const list = document.getElementById('task-list'), empty = document.getElementById('empty');
  const feedback = document.getElementById('task-feedback'), key = 'oluwatoyinAcademicTasks';
  let filter = 'all', tasks = [];
  try { tasks = JSON.parse(localStorage.getItem(key) || '[]'); if (!Array.isArray(tasks)) tasks = []; } catch { tasks = []; }
  const now = new Date(); document.getElementById('today').textContent = now.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});
  due.min = now.toISOString().slice(0,10);
  function save(){ try { localStorage.setItem(key, JSON.stringify(tasks)); } catch { feedback.textContent='Browser storage is unavailable.'; } }
  function render(){
    list.replaceChildren();
    const shown = tasks.filter(t => filter === 'all' || (filter === 'active' && !t.done) || (filter === 'completed' && t.done));
    empty.hidden = shown.length > 0;
    shown.forEach(t => {
      const li=document.createElement('li'); li.className='taskitem'+(t.done?' done':'');
      const check=document.createElement('input'); check.type='checkbox'; check.checked=t.done; check.setAttribute('aria-label','Mark task complete');
      check.addEventListener('change',()=>{t.done=check.checked;save();render();});
      const body=document.createElement('div'); body.className='taskbody';
      const name=document.createElement('strong'); name.textContent=t.title; body.append(name);
      const meta=document.createElement('small'); meta.textContent=[t.course,t.due?'Due '+t.due:''].filter(Boolean).join(' · '); body.append(meta);
      const del=document.createElement('button'); del.type='button'; del.className='delete'; del.textContent='Delete'; del.setAttribute('aria-label','Delete '+t.title);
      del.addEventListener('click',()=>{tasks=tasks.filter(x=>x.id!==t.id);save();render();feedback.textContent='Task deleted.';});
      li.append(check,body,del); list.append(li);
    });
    const completed=tasks.filter(t=>t.done).length, pct=tasks.length?Math.round(completed/tasks.length*100):0;
    document.getElementById('all-count').textContent=tasks.length;
    document.getElementById('active-count').textContent=tasks.length-completed;
    document.getElementById('completed-count').textContent=completed;
    document.getElementById('percent').textContent=pct; document.getElementById('bar').style.width=pct+'%';
    document.getElementById('fraction').textContent=completed+' of '+tasks.length+' completed';
    document.getElementById('progress-caption').textContent=tasks.length?(pct===100?'Everything is complete — great work!':'Keep going, one task at a time.'):'Start with one small task.';
    document.getElementById('clear-completed').disabled=completed===0;
  }
  form.addEventListener('submit',e=>{e.preventDefault();if(!title.value.trim()){feedback.textContent='Enter a task description.';return;}
    tasks.unshift({id:Date.now()+'-'+Math.random(),title:title.value.trim(),course:course.value.trim(),due:due.value,done:false});
    save();form.reset();due.min=now.toISOString().slice(0,10);filter='all';
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));
    feedback.textContent='Task added.';render();title.focus();
  });
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));render();}));
  document.getElementById('clear-completed').addEventListener('click',()=>{tasks=tasks.filter(t=>!t.done);save();render();feedback.textContent='Completed tasks cleared.';});
  render();
});