document.getElementById('estudianteForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let nombre = document.getElementById('nombre').value;
        let documento = document.getElementById('documento').value;
        let nota1 = parseFloat(document.getElementById('nota1').value);
        let nota2 = parseFloat(document.getElementById('nota2').value);
        let nota3 = parseFloat(document.getElementById('nota3').value);
        
        let promedio = calcularPromedio([nota1, nota2, nota3]);
        
        let estu = {
          nombre: nombre,
          documento: documento,
          notas: [nota1, nota2, nota3],
          promedio: promedio
        };
        
        let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        agenda.push(estu);
        localStorage.setItem('agenda', JSON.stringify(agenda));
        
        Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Datos guardados correctamente.',
                showConfirmButton: false,
                timer: 1500
              });
        mostrarAgenda();
        
  
        document.getElementById('nombre').value = '';
        document.getElementById('documento').value = '';
        document.getElementById('nota1').value = '';
        document.getElementById('nota2').value = '';
        document.getElementById('nota3').value = '';
      });
      
      function mostrarAgenda() {
        let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        let aprobadosList = document.getElementById('aprobados-list');
        let desaprobadosList = document.getElementById('desaprobados-list');
        aprobadosList.innerHTML = '';
        desaprobadosList.innerHTML = '';
        
        agenda.forEach(function(estu, index) {
          let li = document.createElement('li');
          li.innerHTML = '<strong>' + estu.nombre + '</strong> - documento: ' + estu.documento + ' - Promedio de notas: ' + estu.promedio;
          
          let button = document.createElement('button');
          button.textContent = 'Eliminar';
          button.addEventListener('click', function() {
            eliminarContacto(index);
          });
      
          li.appendChild(button);
          if (estu.promedio >= 3) {
            aprobadosList.appendChild(li);
          } else {
            desaprobadosList.appendChild(li);
          }
        });
      }
      
      function eliminarContacto(index) {
        let agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        agenda.splice(index, 1);
        localStorage.setItem('agenda', JSON.stringify(agenda));
        Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Datos eliminados de forma exitosa.',
                showConfirmButton: false,
                timer: 1500
              });
        mostrarAgenda();
      }
      
      function calcularPromedio(notas) {
        let sum = notas.reduce(function(acc, val) 
        {
          return acc + val;
        }, 0);
        return (sum / notas.length).toFixed(2);
      }
      
        mostrarAgenda();

function obtenerDatosAPI() {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('agendaAPI', JSON.stringify(data));
            console.log('Datos de la API almacenados en localStorage:', data);
          })
          .catch(error => console.error('Error al obtener datos de la API:', error));
      }
      
        obtenerDatosAPI();
