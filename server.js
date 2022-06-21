import { serve } from 
"https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from
 "https://deno.land/std@0.138.0/http/file_server.ts";

 let a=["ぶどう","さかな","あさ","めがね","くさ","おかね"]
 let x=Math.floor(Math.random()*6); 
let previousWord = (a[x]);

console.log("Listening on http://localhost:8000");
serve(async (req) => {    /**asyncは同時進行で別タスクを処理できる非同期処理*/
  const pathname = new URL(req.url).pathname;  /*reqは多分サーバの通信？のうけとり？   pathnameは変数*/
  console.log(pathname);/**書いている通り打った値をログに残す*/ 

  if (req.method === "GET" && pathname === "/shiritori") {  
     /**コンソールログの更新が続いたとき（真）の時の処理*/ 
     
    return new Response(previousWord); /**新しい単語を入力*/ 
  }
  if(req.method === "POST" && pathname === "/shiritori") {
    /** コンソールログの更新が止まった時（偽）の処理*/
      const requestjson = await req.json();
      const nextWord = requestjson.nextWord;
      if (
          nextWord.length > 0 &&
          previousWord.charAt(previousWord.length - 1) !==
nextWord.charAt(0)
      ){
          return new Response("前の単語に続いていません。",{ status:
400 });      /**{ status:400 });はエラーコード */
      }
      previousWord = nextWord;
      return new Response(previousWord);
  }
  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});