<h1 align="center">Node Profiler SDK</h1>

## Electron、Node Runtime 内存堆监控SDK
- 定时获取堆占用信息，新老内存分配情况
- 提供运行时快照生成，生成两次之间的快照分析内存泄露

## 安装环境
- Node版本需要大于等于V12.0.0

## SDK导出方法

### 1、Profiler类

```JavaScript
const profiler = new Profiler()
```

> [必须] 初始化安装模块方法返回Profiler类

```JavaScript
profiler.install()
```

> 上报一次快照

```JavaScript
profiler.repotHeapSnapshotFile()
```


> Profiler类接受的IProfilerOptions参数

|  字段   | 说明  |
|  :----  | :----  |
| intervalRate  | 获取内存堆信息间隔时间ms |
| repotLimit  | 每次上报内存堆信息的条数 |
| appID	| 每个应用接入的appID |
| profiler | 监控上报的开关 |
| profiler.heap | 是否上报内存堆信息 |
| profiler.heapSnapshot | 是否上报快照 |

