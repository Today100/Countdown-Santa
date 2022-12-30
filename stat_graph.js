function draw_graph(){
  const ctx = document.getElementById('stat-canva');
  arr = JSON.parse(localStorage.getItem('counted'))
  names = arr.flat().map(arry => JSON.parse(arry)[1]);
  datas = arr.flat().map(arry => JSON.parse(arry)[2])
  // console.log(datas[1])
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Hours',
        data: datas,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
