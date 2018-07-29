package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var audioMessage chan []byte
var whatType chan int
var recieverReady bool

func main() {
	audioMessage = make(chan []byte)
	whatType = make(chan int)
	recieverReady = false

	http.HandleFunc("/send", func(w http.ResponseWriter, r *http.Request) {
		conn, _ := websocket.Upgrade(w, r, w.Header(), 1024, 1024)

		go func() {
			for {

				messageType, revdata, _ := conn.ReadMessage()

				fmt.Println("data recieved")
				if recieverReady {
					fmt.Println("Sending data through channel")
					audioMessage <- revdata
					whatType <- messageType
				}
			}
		}()
	})

	http.HandleFunc("/recieve", func(w http.ResponseWriter, r *http.Request) {
		conn, _ := websocket.Upgrade(w, r, w.Header(), 1024, 1024)

		recieverReady = true

		go func() {
			for {
				msg := <-audioMessage
				messageType := <-whatType

				fmt.Println("Sending data to receiver")
				conn.WriteMessage(messageType, msg)
			}
		}()
	})

	http.ListenAndServe(":8080", nil)
}
