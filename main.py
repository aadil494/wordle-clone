five_letter_words = []
with open("words.txt", "r") as f:
    words = f.read().splitlines()
    for word in words:
        if len(word) == 5:
            if "." not in word:
                if "-" not in word:
                    five_letter_words.append(word)

with open("five_letter_words.txt", "w") as f:
    for word in five_letter_words:
        f.write(word.lower() + "\n")