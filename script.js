const KEY = "e01f5efb3cba4f2ba1beeced89c7799e";
const BASEURL = "https://newsapi.org/v2/";
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

window.onload = () => {

	


	$('#submit').click(function(){
		query = $('#query').val();
		category = $('#category').val();
		console.log(query);
		var info;


		const txt = "Fetching your news...";
        let url;

        $('#content').html(`<em>${txt}</em>`);

        if (query === "") {

            url = `${BASEURL}top-headlines?country=in&category=${category}&pageSize=10`;
        }

        else {
            url = `${BASEURL}everything?q=${query}&pageSize=10`;
        }

        console.log(url);
        fetch(url, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${KEY}`
            }
        })
            .then(results => results.json())
            .then(data => {
                if (data.status !== "ok") {
                    //console.log("not ok");
                    $('#content').html(data.message);
                    return;
                }
                //console.log("ok");
                let items = data.articles.map((article, idx) => {
                    return( `	
                        <li key=${idx}>
                            <h3>${article.title}</h3>
                            
                            <p>${article.content}</p>
                            <span>Read full article <a href=${article.url}>here</a></span>
                            <p><strong>Source</strong> - ${article.source.name}</p>

                        </li>`)

                    ;

                })

                $('#content').html(items);
                $('#query').html("");
            });
    }
	);
	}

	
