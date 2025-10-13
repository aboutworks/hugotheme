document.addEventListener("DOMContentLoaded", function () {
    console.log("auth-handler.js 加载完成");

    // 更具体的变量名
    const authCodeInput = document.querySelector("#auth-code-input");
    const authSubmitButton = document.querySelector("#auth-submit-button");
    const authIdElem = document.getElementById("auth-id");
    const authFormSection = document.getElementById("auth-form-section");
    const protectedContentSection = document.getElementById("protected-content-section");

    // 授权ID（唯一标识本内容）
    const authId = authIdElem ? authIdElem.textContent : "";

    // localStorage key
    const STORAGE_KEY = "authorized_content_list";

    // 获取授权列表
    function getAuthorizedList() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    // 保存授权列表
    function setAuthorizedList(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // 检查本地授权
    function checkLocalAuthorization() {
        if (!protectedContentSection || !authFormSection) return false;
        const list = getAuthorizedList();
        const record = list.find(item => item.id === authId);
        if (record && record.status === true) {
            // 已授权，显示内容
            protectedContentSection.style.display = "block";
            authFormSection.style.display = "none";
            return true;
        }
        // 未授权，显示表单
        protectedContentSection.style.display = "none";
        authFormSection.style.display = "block";
        return false;
    }

    // 远程验证授权码
    async function verifyAuthCode(authId, codeInput) {
        const response = await fetch("https://handle.lehuye.com/portals/verify-payment-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "keebone"
            },
            body: JSON.stringify({
                code_order: authId,
                payment_order: codeInput
            })
        });
        if (!response.ok) {
            throw new Error(`网络响应异常: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }

    // 页面加载时自动检查授权
    checkLocalAuthorization();

    // 授权按钮点击事件
    if (authSubmitButton) {
        authSubmitButton.addEventListener("click", async () => {
            console.log("授权提交按钮点击");
            const codeInput = authCodeInput.value.trim();
            if (!codeInput) {
                alert("请输入授权码");
                authCodeInput.focus();
                return;
            }

            authSubmitButton.disabled = true;
            authSubmitButton.textContent = "验证中...";

            try {
                const data = await verifyAuthCode(authId, codeInput);
                let list = getAuthorizedList();
                const idx = list.findIndex(item => item.id === authId);

                if (data.success) {
                    if (idx > -1) {
                        list[idx].status = true;
                    } else {
                        list.push({ id: authId, status: true });
                    }
                    setAuthorizedList(list);
                    protectedContentSection.style.display = "block";
                    authFormSection.style.display = "none";
                    alert("授权成功！");
                } else {
                    if (idx > -1) {
                        list[idx].status = false;
                    } else {
                        list.push({ id: authId, status: false });
                    }
                    setAuthorizedList(list);
                    alert("授权失败：授权码不匹配。");
                }
            } catch (error) {
                console.error("请求失败:", error);
                alert(`发生错误：${error.message}`);
            } finally {
                authSubmitButton.disabled = false;
                authSubmitButton.textContent = "验证授权";
            }
        });
    }

    // 退出授权/验证权限
    document.addEventListener("click", function(e) {
        // 处理授权退出按钮
        if (e.target && e.target.id && e.target.id.startsWith("auth-logout-button_")) {
            const uuid = e.target.id.split("_")[1];
            let list = getAuthorizedList();
            const idx = list.findIndex(item => item.id === uuid);
            if (idx > -1) {
                list[idx].status = false;
                setAuthorizedList(list);
                alert("已退出授权！");
                location.reload();
            }
        }
        // 处理验证权限退出按钮
        if (e.target && e.target.id && e.target.id.startsWith("out-validate-button_")) {
            const uuid = e.target.id.split("_")[1];
            let list = getAuthorizedList();
            const idx = list.findIndex(item => item.id === uuid);
            if (idx > -1) {
                list[idx].status = false;
                setAuthorizedList(list);
                alert("已退出验证权限！");
                location.reload();
            }
        }
    });
});
