import React,{useEffect, useState} from "react";
import {Text, View, FlatList, Box, Touchable, TouchableOpacity} from 'react-native';
import NewsFeed from './NewsFeed';

const News = () =>{
    const [data, setData] = useState(NewsFeed);
  
    return(<>
        <View style={{borderBottomWidth: 3, borderBottomColor: 'red'}}>
            <Text style={{fontSize: 18, marginVertical: 10, fontWeight: 'bold', }}>News</Text>
        </View>
        <View style={{marginTop: 10}}>
            <Text style={{color: 'purple', fontSize: 16}}>{data.totalResults}</Text>
        {data.map( newsitem => {
            return newsitem.articles.map( (item, index) => {
                return (<TouchableOpacity key={index} onPress={()=> alert("hi")}><Text  style={{paddingVertical: 5, paddingHorizontal: 10, marginVertical: 2, backgroundColor: "#c4c4c4"}}>{item.title}</Text></TouchableOpacity>)
            })
        })}
        </View>
        </>
    )
}

export default News;