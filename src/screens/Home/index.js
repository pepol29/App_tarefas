import { useState, useEffect } from "react"
import { Alert, KeyboardAvoidingView, Keyboard } from "react-native";
import { Body, Container, ContainerList, Form, Icon, InputTask, List, Title } from "./styles";
import {ionIcons, MaterialIcons} from "@expo/vector-icons";

export default function Home(){
  const[task,setTask] = useState(['comer','dormir','tomar banho']);
  const[newTask, setNewTask] = useState('');

  async function addTask(){
    setTask([...task, newTask]);
    setNewTask('');

    Keyboard.dismiss();
  }

  async function removeTask(item){
    Alert.alert(
      "Deletar tarefa", "Tem certezabque deseja deletar esta tarefa?",
      [
        {
          text: "Cancel",
          onPress: ()=>{
            return;
          }
        },
        {
          text:"OK",
          onPress: ()=> setTask(task.filter(task => task !== item))
        }
      ],
      {cancelable:"false"}
    )
  }

  return(
    <>
    <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="padding" style={{flex:1}}>
      <Container>
        <Body>
          <List data={task} key={item => item.toString()} renderItem={({item})=>{
            <ContainerList>
              <Title>{item}</Title>
              <Icon onPress={removeTask(item)}>
                <MaterialIcons name = "delete-forever" size={25} color='#f64c75'/>
              </Icon>
            </ContainerList>
          }}>

          </List>
        </Body>
        <Form>
          <InputTask placeholder='Insira sua tarefa' onPress={addTask()}/>
        </Form>
      </Container>
    </KeyboardAvoidingView>
    
    </>
  )
}