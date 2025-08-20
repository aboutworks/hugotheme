
//const serviceUrl = 'http://localhost:7020'
const serviceUrl = 'https://handle.lehuye.com'

function formComments(postId) {
    return `
        <form id="kb-comment-form-${postId}" class="kb-comment-form">
            <input type="text" id="comment-name-${postId}" placeholder="Your name" required />
            <textarea id="comment-content-${postId}" placeholder="Your comment" required></textarea>
            <button type="button" onclick="submitComment('${postId}')">Submit</button>
        </form>
    `;
}

// 提交评论的函数
function submitComment(postId) {
    // 获取表单中的输入值
    const name = document.getElementById(`comment-name-${postId}`).value;
    const content = document.getElementById(`comment-content-${postId}`).value;

    // 校验输入
    if (!name || !content) {
        alert('Please fill out both fields.');
        return;
    }

    // 提交评论到 API
    fetch(`${serviceUrl}/comments/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId: postId, // 使用从 form ID 获取的 postId
            comment: content,
            email: name // 或根据实际需求收集用户邮箱
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Comment added successfully') {
            alert('Your comment has been added!');
            // 可选：重置表单或执行其他操作
            document.getElementById(`kb-comment-form-${postId}`).reset();

			getComments(postId)
        } else {
            alert('Failed to add comment');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting your comment');
    });
}
function getComments(getId) {
    console.log('getID:', getId);

    // 使用 fetch 从 API 获取评论数据
    fetch(`${serviceUrl}/comments/get/${getId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
			console.log(data)
            // 获取评论数据并生成评论列表
            let commentListHtml = '';
            if (data && data.comments && data.comments.length > 0) {
                // 如果获取到评论，生成评论列表
                commentListHtml = data.comments.map(comment => {
                    // 提取邮箱域名
                    const name = comment.email.split('@')[0];
                    const date = comment.create_date;
                    return `
                        <li>
                            <div style="color:gray">${name} Say:</div>
                            <p>${comment.comment}
                                <span 
                                    style="color:#2B98FD; cursor:pointer;" 
                                    onclick="addToCommentTextarea('@${name}', '${getId}')">Rep</span>
                            </p>
                            <time style="font-size:12px">${date}</time>
                        </li>
                    `;
                }).join('');

				document.getElementById(`comment-list-container-${getId}`).innerHTML = commentListHtml
            } else {
                // 如果没有评论，显示暂无评论
                commentListHtml = '<p>Not Comments</p>';
            }

            // 将评论列表 HTML 插入到页面中
            const commentListContainer = document.getElementById(`comment-list-container-${getId}`);
            if (commentListContainer) {
                commentListContainer.innerHTML = `<div class="kb-comment-list"><ul>${commentListHtml}</ul></div>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // 处理错误时显示默认信息
            const commentListContainer = document.getElementById(`comment-list-container-${getId}`);
            if (commentListContainer) {
                commentListContainer.innerHTML = '<p>Failed to load comments. Please try again later.</p>';
            }
        });
}
function addToCommentTextarea(name, postId) {
	const textarea = document.getElementById(`comment-content-${postId}`);
	if (textarea) {
		// 获取当前光标的位置
		const cursorPosition = textarea.selectionStart;

		// 获取textarea当前的内容
		const currentText = textarea.value;

		// 在光标位置插入用户名
		const newText = currentText.slice(0, cursorPosition) + `${name}, ` + currentText.slice(cursorPosition);

		// 更新textarea的内容
		textarea.value = newText;

		// 将光标位置移动到插入文本的后面
		textarea.selectionStart = textarea.selectionEnd = cursorPosition + name.length + 2; // 2是因为添加了一个逗号和空格
	}
}
function loadComments(postId) {
	fetch(`/api/comments?postId=${encodeURIComponent(postId)}`)
		.then(response => response.json())
		.then(comments => {
			const commentList = document.getElementById('comment-list');
			commentList.innerHTML = comments.map(comment => `
		  <div class="comment">
			<strong>${comment.name}</strong> <em>${new Date(comment.date).toLocaleString()}</em>
			<p>${comment.content}</p>
		  </div>
		`).join('');
		});
}