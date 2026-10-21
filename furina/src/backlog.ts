// 대사 로그(백로그): 지금까지 표시된 대사와 고른 선택지를 순서대로 보여준다.
import type { Speaker } from './scenario';
import { SPEAKER_NAME } from './stage';

export class Backlog {
  private panel = document.querySelector<HTMLElement>('#backlog')!;
  private list = document.querySelector<HTMLOListElement>('#log-list')!;

  get isOpen() {
    return this.panel.classList.contains('on');
  }

  addLine(speaker: Speaker, text: string) {
    const li = document.createElement('li');
    li.dataset.speaker = speaker;
    if (SPEAKER_NAME[speaker]) {
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = SPEAKER_NAME[speaker];
      li.append(name);
    }
    const body = document.createElement('p');
    body.textContent = text;
    li.append(body);
    this.list.append(li);
  }

  addChoice(text: string) {
    const li = document.createElement('li');
    li.className = 'picked';
    li.textContent = text;
    this.list.append(li);
  }

  clear() {
    this.list.replaceChildren();
  }

  open() {
    this.panel.inert = false;
    this.panel.classList.add('on');
    this.list.scrollTop = this.list.scrollHeight; // 최신 대사부터 보이게
  }

  close() {
    this.panel.classList.remove('on');
    this.panel.inert = true;
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }
}
