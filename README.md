<h1 align="center">Node Profiler SDK</h1>

## 兼容 Electron、Node Runtime 内存堆监控 SDK
- 定时获取堆占用信息，新老内存分配情况
- 提供运行时快照生成，生成两次之间的快照分析内存泄露

## 安装环境
- Node 版本需要大于等于 V12.0.0

## SDK导出方法

### 1、Profiler 类

```JavaScript

const { Profiler } from 'node-profiler-sdk'
const profiler = new Profiler()
```

> [**必须**] 初始化安装模块方法返回 Profiler 类

```JavaScript
profiler.install()
```

> 上报一次快照

```JavaScript
profiler.getHeapSnapshot()
```

> **event** 类，事件监听  
枚举事件动作 **ProfilerEventAction**

```JavaScript
// 监听事件reportHeap上报内存堆信息
profiler.event.on('reportHeap', (data) => {
	console.log('reportHeap', data)
})
```


> Profiler 类接受的 IProfilerOptions 参数

|  字段   | 说明  |
|  :----  | :----  |
| intervalRate  | 获取内存堆信息间隔时间ms |
| repotLimit  | 每次上报内存堆信息的条数 |
| appID	| 每个应用接入的appID |
| profiler | 监控上报的开关 |
| profiler.heap | 是否上报内存堆信息 |
| profiler.heapSnapshot | 是否上报快照 |

<br />

### 2、全局 config 配置

> **setAppID**  

应用需要设置唯一 appID 作为标识

```JavaScript
const { setAppID } from 'node-profiler-sdk'
setAppID('xxxx')
```

> **getConfig** 获取全局的配置

```JavaScript
const { getConfig } from 'node-profiler-sdk'
getConfig()
```