import React,{useEffect, useState} from "react";
import {Text, View, FlatList, Box} from 'react-native';
import NewsFeed from './NewsFeed';

const News = () =>{
    const [data, setData] = useState(NewsFeed);
  const [loading, setLoading] = useState(true);
    // const fetchData = async () => {
    //     //const resp = await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=45885de262314818a2a4529601364d45");
    //     // const resp = NewsFeed
    //     // const data = await resp.json();
    //     // setData(data);
    //     // setLoading(false);
    //     console.log(JSON.stringify(NewsFeed, null, 2))
    //     setData(NewsFeed.json())
    //   };
    //   const renderItem = ({ item }) => {
    //     return (
    //       <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
    //         {item.title}
    //       </Box>
    //     );
    //   };
   
    //   useEffect(() => {
    //     fetchData();
    //   }, []);
console.log(JSON.stringify(data, null, 2))
    return(<>
        <View style={{borderBottomWidth: 3, borderBottomColor: 'red'}}>
            <Text style={{fontSize: 18, marginVertical: 10, fontWeight: 'bold', }}>News</Text>
        </View>
        <View style={{marginTop: 10}}>
            <Text style={{color: 'purple', fontSize: 16}}>{data.totalResults}</Text>
        {data.map( newsitem => {
            return newsitem.articles.map( item => {
                return (<Text style={{paddingVertical: 5, paddingHorizontal: 10, marginVertical: 2, backgroundColor: "#c4c4c4"}}>{item.title}</Text>)
            })
        })}
        </View>
        </>
    )
}

export default News;