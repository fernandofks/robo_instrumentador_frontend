# To add a textbox and a send button to your Flask app and receive input from the 
# textbox in your Python file, you can use HTML forms. Here's an updated version 
# of your app.py file to include a simple form


from flask import Flask, render_template, request

#bibliotecas para fazer publish em um topic num broket mqtt
import ssl
import time
import paho.mqtt.client as mqtt_client

#importando certificados para usar broker da AWS
broker = "aspvpxjmfalxx-ats.iot.us-east-1.amazonaws.com"
port = 443
topic = "gi/mandando/dados"
client_id = f'Giovanni'

ca = "certs/AmazonRootCA1.pem" 
cert = "certs/6f963f6ec45fbc59ebb98cf9df943424944b334aec0a18ce0f2e7f5d256530c9-certificate.pem.crt"
private = "certs/6f963f6ec45fbc59ebb98cf9df943424944b334aec0a18ce0f2e7f5d256530c9-private.pem.key"

#funções do tavares
def ssl_alpn():
    try:
        ssl_context = ssl.create_default_context()
        ssl_context.set_alpn_protocols(["x-amzn-mqtt-ca"])
        ssl_context.load_verify_locations(cafile=ca)
        ssl_context.load_cert_chain(certfile=cert, keyfile=private)

        return  ssl_context
    except Exception as e:
        print("exception ssl_alpn()")
        raise e

def connect():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    ssl_context = ssl_alpn()
    client.tls_set_context(context=ssl_context)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def publish(client,user_input):
    msg_count = 1
    while True:
        time.sleep(1)
        msg = f"{user_input}"
        result = client.publish(topic, msg,1)
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1
        if msg_count > 30:
            break

def run():
    client = connect()
    publish(client)
    client.disconnect()


#código Flask do Gepeto
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def hello():
    if request.method == 'POST':
        # Get the input from the textbox
        user_input = request.form['user_input']
        print(user_input)
        
        # Publish the custom message to the MQTT broker
        client = connect()
        publish(client, user_input)
        client.disconnect()
        
        return f'Message published to MQTT: {user_input}'

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)