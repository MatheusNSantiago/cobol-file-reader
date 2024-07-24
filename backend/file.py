class File:
    lines: list[str] = []
    size: int

    def __init__(self, path, size):
        with open(path, "rb") as f:
            while line := f.read(size):
                if line == b"\n":
                    continue
                self.lines.append(line)
