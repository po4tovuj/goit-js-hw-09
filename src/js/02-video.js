import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
const CURRENT_TIME_ENUM = 'videoplayer-current-time';
const FREQUENCY = 1000;
const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);
const updateTime = ({ seconds }) => {
  saveCurrentTimeToLocalStorage(seconds);
};
player.ready().then(() => {
  const time = getCurrentTimeFromLocalStorage();
  player.setCurrentTime(time);
});
player.on('timeupdate', throttle(updateTime, FREQUENCY));

function saveCurrentTimeToLocalStorage(time) {
  localStorage.setItem(CURRENT_TIME_ENUM, time);
}
function getCurrentTimeFromLocalStorage() {
  return localStorage.getItem(CURRENT_TIME_ENUM) || 0;
}
