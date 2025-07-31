document.querySelector("#ssh-validate-button").addEventListener("click", async () => {
    console.log("SSH验证按钮被点击了");
    console.log("当前时间戳:", new Date().toISOString());

    // 获取DOM元素
    const sshKeyInput = document.querySelector("#ssh-key");
	const idcode =  document.getElementById("idcode").textContent
    const validateButton = document.querySelector("#ssh-validate-button");
    const inputText = sshKeyInput.value.trim();
    
    // 输入验证
    if (!inputText) {
        alert("请输入SSH授权串码");
        sshKeyInput.focus();
        return;
    }
    
    console.log("输入的SSH授权串码:",idcode, inputText);
    
    // 显示加载状态
    validateButton.disabled = true;
    validateButton.textContent = "验证中...";
    
    try {
        // 发送验证请求
        const response = await fetch("https://handle.lehuye.com/portals/verify-payment-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "keebone"
            },
            body: JSON.stringify({
                code_order: idcode,
                payment_order: inputText
            })
        });
        
        if (!response.ok) {
            throw new Error(`网络响应异常: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        const auuid = window.auuid || 'default-auuid';
        const jsonData = window.jsonData || { uuid: 'default-uuid' };
        
        if (data.success) {
			console.log(data.success)
            console.log("验证状态已保存到 localStorage:", idcode, data.result);
            localStorage.setItem(idcode, JSON.stringify(data.result)); // 使用JSON.stringify确保类型正确
            document.getElementById("protected-content").style.display = "block";
            document.getElementById("validator").style.display = "none";
            document.getElementById("valid-form").style.display = "none";
            alert("验证成功！");
        } else {
            localStorage.setItem(jsonData.uuid, JSON.stringify(false));
            localStorage.setItem(auuid, JSON.stringify(false));
            alert("验证失败：私钥不匹配。");
        }
    } catch (error) {
        console.error("请求失败:", error);
        alert(`发生错误：${error.message}`);
    } finally {
        // 恢复按钮状态
        validateButton.disabled = false;
        validateButton.textContent = "验证";
    }
});
