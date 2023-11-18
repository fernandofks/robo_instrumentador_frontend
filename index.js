

    
    function atualiza_valores(){
    
        fetch('https://robo-instrumentador-backend-render.onrender.com/kit')
        .then(function(res){ return res.json(); })
        .then(function(data){document.getElementById("ttt").innerText = JSON.stringify( data ) })
        
        }
        function mandar(){
            nome_instrumento=document.getElementById("nome_instrumento").value
            var payload = {
                "nome_instrumento":nome_instrumento
    }
        fetch('https://robo-instrumentador-backend-render.onrender.com/add_kit/',
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
        