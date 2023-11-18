

function atualiza_valores(){
    
    fetch('https://robo-instrumentador-backend-render.onrender.com/cirurgia')
    .then(function(res){ return res.json(); })
    .then(function(data){data.sort(compareById=(a, b)=>{
        return a.id - b.id;
    }
    )
    var tabela_cirurgias=document.getElementById('tabela_cirurgias');
    
    data.forEach(element => {
        var elemento = document.createElement('div');
        var crm = document.createElement('p')
        var cpf = document.createElement('p')
        var sala = document.createElement('p')
        var tipo = document.createElement('p')
        var kit = document.createElement('p')
        crm.textContent="CRM: "+element.CRM_Medico
        cpf.textContent="CPF: "+element.CPF_Paciente
        sala.textContent="Sala: "+element.Sala_Hospital
        tipo.textContent="Tipo de Cirurgia: "+element.Tipo_Cirurgia
        kit.textContent="Kit: "+ element.Kit_id
        elemento.appendChild(crm)
        elemento.appendChild(cpf)
        elemento.appendChild(sala)
        elemento.appendChild(tipo)
        elemento.appendChild(kit)
        elemento.className = "cirurgia"
        tabela_cirurgias.appendChild(elemento);
        
        
    }
    
    );
}
);
}

function mandar(){
    crm=parseInt(document.getElementById("crm").value)
    cpf=parseInt(document.getElementById("cpf").value)
    sala=parseInt(document.getElementById("sala").value)
    tipo=document.getElementById("tipo").value
    kit=parseInt(document.getElementById("kit").value)
    var payload = {
        "CRM_Medico": crm,
        "CPF_Paciente": cpf,
        "Sala_Hospital": sala,
        "Tipo_Cirurgia": tipo,
        "Kit_id":kit
    }
    fetch('https://robo-instrumentador-backend-render.onrender.com/add_cirurgia/',
    {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(atualiza_valores())
}

atualiza_valores()
